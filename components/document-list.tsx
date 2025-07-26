import React from 'react';
import { FileText, Clock, FileEdit, Trash2, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

type Document = {
  id: string;
  title: string;
  type: 'resume' | 'presentation' | 'cv' | 'letter';
  updatedAt: string;
  status: 'draft' | 'published' | 'archived';
};

const statusVariants: Record<string, string> = {
  draft: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
  published: 'bg-green-100 text-green-800 hover:bg-green-200',
  archived: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
};

const typeIcons: Record<string, React.ReactNode> = {
  resume: <FileText className="h-4 w-4 mr-2" />,
  presentation: <FileText className="h-4 w-4 mr-2" />,
  cv: <FileText className="h-4 w-4 mr-2" />,
  letter: <FileText className="h-4 w-4 mr-2" />,
};

interface DocumentListProps {
  maxItems?: number;
}

export function DocumentList({ maxItems = 5 }: DocumentListProps) {
  // Mock data - replace with actual data fetching
  const documents: Document[] = [
    {
      id: '1',
      title: 'Senior Software Engineer Resume',
      type: 'resume',
      updatedAt: '2023-06-15T10:30:00',
      status: 'published',
    },
    {
      id: '2',
      title: 'Q2 Product Roadmap',
      type: 'presentation',
      updatedAt: '2023-06-10T14:45:00',
      status: 'draft',
    },
    {
      id: '3',
      title: 'Cover Letter - Google',
      type: 'letter',
      updatedAt: '2023-06-05T09:15:00',
      status: 'published',
    },
  ];

  // Limit the number of documents to display
  const visibleDocuments = maxItems ? documents.slice(0, maxItems) : documents;

  const handleEdit = (id: string) => {
    console.log('Edit document:', id);
    // Navigate to edit page
  };

  const handleDownload = (id: string) => {
    console.log('Download document:', id);
    // Implement download logic
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this document?')) {
      console.log('Delete document:', id);
      // Implement delete logic
    }
  };

  if (documents.length === 0) {
    return (
      <div className="text-center py-12">
        <FileText className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">No documents</h3>
        <p className="mt-1 text-sm text-gray-500">
          Get started by creating a new document.
        </p>
        <div className="mt-6">
          <Button>
            <FileText className="mr-2 h-4 w-4" />
            New Document
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border divide-y">
        {visibleDocuments.map((doc) => (
          <div
            key={doc.id}
            className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <div className="rounded-md bg-primary/10 p-2 text-primary">
                {typeIcons[doc.type]}
              </div>
              <div>
                <div className="font-medium">{doc.title}</div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="mr-1 h-3 w-3" />
                  <span>
                    Updated{' '}
                    {new Date(doc.updatedAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge
                variant="outline"
                className={`${statusVariants[doc.status]} capitalize`}
              >
                {doc.status}
              </Badge>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => handleEdit(doc.id)}
              >
                <FileEdit className="h-4 w-4" />
                <span className="sr-only">Edit</span>
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => handleDownload(doc.id)}
              >
                <Download className="h-4 w-4" />
                <span className="sr-only">Download</span>
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-destructive hover:text-destructive"
                onClick={() => handleDelete(doc.id)}
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete</span>
              </Button>
            </div>
          </div>
        ))}
      </div>
      {maxItems && documents.length > maxItems && (
        <div className="text-center">
          <Button variant="ghost">
            View all documents
          </Button>
        </div>
      )}
    </div>
  );
}
