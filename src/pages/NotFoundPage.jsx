import Button from '../components/ui/Button.jsx'
import Container from '../components/ui/Container.jsx'

export default function NotFoundPage() {
  return (
    <Container className="flex flex-col items-center gap-5 py-24 text-center">
      <span className="text-6xl" aria-hidden="true">
        🥚
      </span>
      <h1 className="text-3xl font-extrabold tracking-tight">Halaman tidak ditemukan</h1>
      <p className="max-w-md text-inksoft">
        Sepertinya telur yang kamu cari sudah keburu terjual. Kembali ke beranda untuk melihat stok terbaru.
      </p>
      <Button to="/" size="lg">
        Kembali ke beranda
      </Button>
    </Container>
  )
}
