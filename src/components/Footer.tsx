export default function Footer() {
  return (
    <footer className="border-t border-border bg-card/30">
      <div className="max-w-[1100px] mx-auto px-6 md:px-12 lg:px-24 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
        
        <div className="flex items-center gap-6 text-sm">
          <a href="https://substack.com/@mattwaseem" target="_blank" rel="noopener noreferrer" className="link-hover">Substack</a>
          <a href="https://github.com/mattwaseem" target="_blank" rel="noopener noreferrer" className="link-hover">GitHub</a>
          <a href="https://www.linkedin.com/in/mattwaseem/" target="_blank" rel="noopener noreferrer" className="link-hover">LinkedIn</a>
          <a href="https://www.linkedin.com/in/mattwaseem/" className="link-hover">Substack</a>
        </div>

        <div className="text-muted-foreground text-sm font-mono">
          © {new Date().getFullYear()} Matt Waseem
        </div>

      </div>
    </footer>
  );
}
