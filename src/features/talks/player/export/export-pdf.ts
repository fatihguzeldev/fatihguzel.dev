export async function exportPdf() {
  await document.fonts.ready
  await Promise.all(
    Array.from(document.images, (image) => image.decode().catch(() => {})),
  )
  window.print()
}
