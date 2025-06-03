interface LetterPreviewProps {
  letter: any;
}

export function LetterPreview({ letter }: LetterPreviewProps) {
  if (!letter) return null;

  return (
    <div className="p-8 max-w-[800px] mx-auto font-serif">
      <div className="mb-8">
        {letter.from.name && (
          <p className="mb-1">{letter.from.name}</p>
        )}
        {letter.from.address && (
          <p className="text-sm text-gray-700">{letter.from.address}</p>
        )}
      </div>
      
      <div className="mb-8">
        <p className="mb-1">{letter.date}</p>
      </div>
      
      <div className="mb-8">
        {letter.to.name && (
          <p className="mb-1">{letter.to.name}</p>
        )}
        {letter.to.address && (
          <p className="text-sm text-gray-700">{letter.to.address}</p>
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