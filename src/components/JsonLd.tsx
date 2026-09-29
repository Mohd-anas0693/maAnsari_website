/**
 * Renders JSON-LD. Server component — the payload is serialised at build
 * time and costs the client nothing beyond the bytes.
 */
export function JsonLd({ data }: { data: unknown | unknown[] }) {
  const payload = Array.isArray(data) ? data : [data];
  return (
    <>
      {payload.filter(Boolean).map((entry, index) => (
        <script
          key={index}
          type="application/ld+json"
          // Escaping `<` prevents a `</script>` sequence inside data from
          // closing the tag early.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(entry).replace(/</g, "\\u003c"),
          }}
        />
      ))}
    </>
  );
}
