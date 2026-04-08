import * as React from 'react'
import { Button } from './components/ui/Button'
import { Sparkles, Box, MousePointer2, Github, MessageSquare, ChevronDown } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "./components/ui/Dialog"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/Card"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./components/ui/Select"
import { MultiSelect, type Option } from "./components/ui/MultiSelect"

const HUMAN_NAMES = [
  "Alexander Thompson",
  "Isabella Garcia",
  "Sebastian Chen",
  "Sophia Rodriguez",
  "Liam O'Connor",
  "Emma Watanabe",
  "Noah Kowalski",
  "Olivia Muller"
]

const HUMAN_OBJECTS: Option[] = [
  { id: 1, name: "Alexander Thompson", role: "lead engineer" },
  { id: 2, name: "Isabella Garcia", role: "product designer" },
  { id: 3, name: "Sebastian Chen", role: "frontend developer" },
  { id: 4, name: "Sophia Rodriguez", role: "ux researcher" },
  { id: 5, name: "Liam O'Connor", role: "backend architect" },
  { id: 6, name: "Emma Watanabe", role: "qa engineer" },
  { id: 7, name: "Noah Kowalski", role: "devops lead" },
  { id: 8, name: "Olivia Muller", role: "data scientist" },
]

function App() {
  const [selectedHumans, setSelectedHumans] = React.useState<Option[]>([
    HUMAN_OBJECTS[0],
    HUMAN_OBJECTS[2]
  ])

  return (
    <div className="min-h-screen bg-background selection:bg-primary/20 selection:text-primary">
      {/* Background patterns */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[10%] left-[10%] w-[60%] h-[60%] bg-blue-100/50 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[10%] right-[10%] w-[50%] h-[50%] bg-purple-100/50 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] contrast-150 brightness-100" />
      </div>

      <nav className="border-b border-black/5 backdrop-blur-md sticky top-0 z-50 bg-white/50">
        <div className="container mx-auto h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform shadow-lg shadow-primary/20">
              <Box className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-outfit font-bold text-xl tracking-tight text-slate-900">Ziad Components</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">Components</a>
            <a href="#" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">Docs</a>
            <Button variant="ghost" size="icon" className="text-slate-500" asChild>
              <a href="https://github.com/mitra-cerdas-nusantara/ziad-react-component.git" target="_blank" rel="noopener noreferrer">
                <Github className="w-5 h-5" />
              </a>
            </Button>
            <Button variant="premium" size="sm">Get Started</Button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto py-24 space-y-32">
        {/* Hero Section */}
        <section className="text-center space-y-8 animate-fade-in relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-semibold text-blue-600">
            <Sparkles className="w-3 h-3" />
            <span>Built with Radix UI & Tailwind CSS</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-outfit font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-slate-900 to-slate-500 max-w-4xl mx-auto leading-tight">
            Crafting premium components with speed.
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto font-inter leading-relaxed">
            A specialized collection of React components designed for beauty, accessibility, and high performance.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button size="lg" className="rounded-full px-8 shadow-xl shadow-primary/20">Explores Components</Button>
            <Button variant="outline" size="lg" className="rounded-full px-8 bg-white/50" asChild>
              <a href="https://github.com/mitra-cerdas-nusantara/ziad-react-component.git" target="_blank" rel="noopener noreferrer">
                View on GitHub
              </a>
            </Button>
          </div>
        </section>

        {/* Component Showcase Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="glass group hover:border-blue-200 transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform mb-4 shadow-sm">
                <MousePointer2 className="w-6 h-6" />
              </div>
              <CardTitle className="font-outfit text-2xl text-slate-900">Multi Select</CardTitle>
              <CardDescription className="text-slate-500">Select multiple team members with real-time state management.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="pt-2">
                <MultiSelect
                  options={HUMAN_OBJECTS}
                  selected={selectedHumans}
                  onChange={setSelectedHumans}
                  placeholder="Select team members..."
                />
                <div className="mt-6 p-4 rounded-2xl bg-slate-50 border border-slate-200/60 shadow-inner">
                  <p className="text-[11px] text-slate-400 uppercase font-bold tracking-widest mb-3 border-b border-slate-200/60 pb-2">State Log</p>
                  <pre className="text-[11px] text-slate-700 font-mono overflow-auto max-h-44 custom-scrollbar leading-relaxed">
                    {JSON.stringify(selectedHumans, null, 2)}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass group hover:border-orange-200 transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 group-hover:scale-110 transition-transform mb-4 shadow-sm">
                <ChevronDown className="w-6 h-6" />
              </div>
              <CardTitle className="font-outfit text-2xl text-slate-900">Select</CardTitle>
              <CardDescription className="text-slate-500">Elegant dropdown selection with advanced accessibility.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="pt-2">
                <Select>
                  <SelectTrigger className="w-full bg-white/50">
                    <SelectValue placeholder="Select a representative" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel className="text-slate-400 uppercase text-[10px] tracking-widest px-4 py-2">Team Roles</SelectLabel>
                      {HUMAN_NAMES.map((name) => (
                        <SelectItem key={name} value={name.toLowerCase().replace(' ', '-')} className="focus:bg-slate-100 focus:text-slate-900 transition-colors py-2.5">
                          {name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card className="glass group hover:border-purple-200 transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600 group-hover:scale-110 transition-transform mb-4 shadow-sm">
                <MessageSquare className="w-6 h-6" />
              </div>
              <CardTitle className="font-outfit text-2xl text-slate-900">Modals</CardTitle>
              <CardDescription className="text-slate-500">Accessible dialogs with smooth transitions and backdrop blur.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="pt-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full h-12 rounded-xl bg-white/50 hover:bg-white transition-all">Open Dialog</Button>
                  </DialogTrigger>
                  <DialogContent className="rounded-3xl">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-outfit">Modal Component</DialogTitle>
                      <DialogDescription>
                        This is a custom dialog built with Radix UI and Tailwind CSS.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-8">
                      <div className="h-40 rounded-2xl bg-slate-50 border border-dashed border-slate-200 flex items-center justify-center text-slate-400 font-medium">
                        Shadcn Compatible Content
                      </div>
                    </div>
                    <DialogFooter className="gap-2">
                      <Button variant="ghost" className="rounded-xl">Cancel</Button>
                      <Button className="rounded-xl shadow-lg shadow-primary/20">Save changes</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t border-black/5 py-12 bg-white/50">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <Box className="w-5 h-5 text-primary" />
            <span className="font-outfit font-bold text-slate-900">Ziad Components</span>
          </div>
          <p className="text-sm text-slate-500">© 2026 Built with ❤️ by MCN Squads.</p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-slate-400 hover:text-slate-900 transition-colors">Privacy</a>
            <a href="#" className="text-sm text-slate-400 hover:text-slate-900 transition-colors">Terms</a>
            <a href="#" className="text-sm text-slate-400 hover:text-slate-900 transition-colors">Twitter</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
