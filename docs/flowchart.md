# DocMagic Project Workflow

This flowchart visually represents the stages and workflow of contributing to the DocMagic project

# 📊 Project Workflow - DocMagic

```mermaid
flowchart TD
    A[📂 Start Project] --> B[🛠️ Setup Repo]
    B --> C[📑 Read Contribution Guidelines]
    C --> D[🌱 Create a New Branch]
    D --> E[💻 Work on the Issue]
    E --> F[✅ Commit Changes]
    F --> G[🚀 Push to GitHub]
    G --> H[🔁 Create Pull Request]
    H --> I[👀 Review by Maintainers]
    I --> J{Merged or Rejected?}
    J --✅ Merged--> K[🎉 Done]
    J --❌ Rejected--> L[🔁 Make Changes & Resubmit]
    L --> F
