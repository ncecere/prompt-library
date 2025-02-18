import PromptList from "@/components/prompt-list"
import { getAllPrompts, createSamplePrompts } from "@/lib/api"

export default async function Home() {
  console.log("Fetching all prompts...")
  let prompts = await getAllPrompts()

  if (prompts.length === 0) {
    console.log("No prompts found, creating sample prompts")
    createSamplePrompts()
    prompts = await getAllPrompts()
  }

  console.log(`Fetched ${prompts.length} prompts`)

  if (prompts.length === 0) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold text-foreground">No prompts found</h2>
        <p className="text-muted-foreground">Please make sure you have added some prompt files in the &apos;prompts&apos; directory.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <PromptList initialPrompts={prompts} />
    </div>
  )
}
