import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { Database } from '@/types/supabase';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  const limit = searchParams.get('limit');
  const includePublic = searchParams.get('includePublic') === 'true';
  
  const supabase = createRouteHandlerClient({ cookies });
  
  try {
    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Base query for user's templates
    let query = supabase
      .from('templates')
      .select('*')
      .eq('user_id', user.id);

    // Add type filter if provided
    if (type) {
      query = query.eq('type', type);
    }

    // Add limit if provided
    if (limit) {
      query = query.limit(Number(limit));
    }

    // Include public templates if requested
    if (includePublic) {
      const { data: publicTemplates } = await supabase
        .from('templates')
        .select('*')
        .eq('is_public', true)
        .neq('user_id', user.id);

      const { data: userTemplates, error: templatesError } = await query;
      
      if (templatesError) throw templatesError;

      // Combine user's templates with public templates
      const allTemplates = [...(userTemplates || []), ...(publicTemplates || [])];
      return NextResponse.json(allTemplates);
    }

    // Just return user's templates
    const { data: templates, error: templatesError } = await query;
    if (templatesError) throw templatesError;

    return NextResponse.json(templates || []);
  } catch (error) {
    console.error('Error fetching templates:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Failed to fetch templates' }), 
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function POST(request: Request) {
  const supabase = createRouteHandlerClient({ cookies });
  
  try {
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const body = await request.json();
    const { title, description, type, content, isPublic } = body;

    // Validate required fields
    if (!title || !type) {
      return new NextResponse(
        JSON.stringify({ error: 'Title and type are required' }), 
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const { data: template, error } = await supabase
      .from('templates')
      .insert([
        { 
          user_id: user.id,
          title,
          description: description || null,
          type,
          content: content || {},
          is_public: Boolean(isPublic),
          is_default: false
        }
      ])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(template, { status: 201 });
  } catch (error) {
    console.error('Error creating template:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Failed to create template' }), 
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
