import React from "react";

export default function PrintPdfLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <body>
      <div>{children}</div>
    </body>
  )
}
