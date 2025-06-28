interface LetterPreviewProps {
  letter: any;
}

export function LetterPreview({ letter }: LetterPreviewProps) {
  if (!letter) return null;

  // Ensure letter has the expected structure to prevent "Cannot read properties of undefined" errors
  const from = letter.from || {};
  const to = letter.to || {};

  return (
    <div className="p-8 max-w-[800px] mx-auto font-serif">
      <div className="mb-8">
        {from.name && (
          <p className="mb-1">{from.name}</p>
        )}
        {from.address && (
          <p className="text-sm text-gray-700">{from.address}</p>
        )}
      </div>
      
      <div className="mb-8">
        <p className="mb-1">{letter.date}</p>
      </div>
      
      <div className="mb-8">
        {to.name && (
          <p className="mb-1">{to.name}</p>
        )}
        {to.address && (
          <p className="text-sm text-gray-700">{to.address}</p>
        )}
      </div>
      
      <div className="mb-6">
        <p className="font-semibold">Subject: {letter.subject}</p>
      </div>
      
      <div className="whitespace-pre-line text-gray-800 leading-relaxed">
        {letter.content}
      </div>
    </div>
  );
}