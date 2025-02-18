import { Badge } from "@/components/ui/badge"
import { CopyButton } from "@/components/copy-button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getPromptContent, getAllPromptIds } from "@/lib/api"
import Link from "next/link"

export async function generateStaticParams() {
  const paths = getAllPromptIds()
  console.log(`Generated ${paths.length} static paths`)
  return paths
}

export default async function PromptPage({ params }: { params: { id: string } }) {
  console.log(`Fetching prompt content for id: ${params.id}`)
  const prompt = await getPromptContent(params.id)

  if (!prompt) {
    console.log(`Prompt not found for id: ${params.id}`)
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold text-foreground">Prompt not found</h2>
        <p className="text-muted-foreground">The requested prompt does not exist.</p>
        <Link href="/" className="text-primary hover:underline mt-4 inline-block">
          Return to home
        </Link>
      </div>
    )
  }

  console.log(`Rendering prompt page for id: ${params.id}`)
  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>{prompt.name}</CardTitle>
        <p className="text-sm text-muted-foreground">{prompt.description}</p>
        <div className="flex flex-wrap gap-2 mt-2">
          {prompt.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <div className="prompt-container">
          <pre>
            <code>{prompt.content}</code>
          </pre>
          <CopyButton content={prompt.content} />
        </div>
      </CardContent>
    </Card>
  )
}
