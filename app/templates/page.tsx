import { Metadata } from "next";
import { TemplateList } from "@/components/templates/template-list";

export const metadata: Metadata = {
  title: "Templates | DocMagic",
  description: "Browse and manage your document templates",
};

export default function TemplatesPage() {
  return (
    <div className="container py-8">
      <TemplateList />
    </div>
  );
}
