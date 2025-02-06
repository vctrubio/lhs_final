diff --git a/src/app/layout.tsx b/src/app/layout.tsx
index 1b074d2..0dce4b8 100644
--- a/src/app/layout.tsx
+++ b/src/app/layout.tsx
@@ -21,18 +21,19 @@ export const viewport: Viewport = {
 
 export const metadata: Metadata = {
   title: "LHS Concept",
-  description: "Propiedades de Lujo en Madrid",
+  description: "Con mas de 20 años de experiencia en el mercado inmobiliario de lujo, nos especializamos en ayudar a nuestros clientes comprar y vender propiedades de lujo en las ubicaciones más exclusivas de Madrid.",
+  //Confirm
   icons: {
-    icon: '/icon.svg',
-    shortcut: '/icon.svg',
-    apple: '/icon.svg',
+    icon: '/globe.svg',
+    shortcut: '/globe.svg',
+    apple: '/globe.svg',
   },
 
-  keywords: "luxury, lifestyle, Madrid, exclusive, homes, family-oriented, real estate, high-end living, propiedades de lujo en madrid, propiedades seelectas, LHS Concept, LHS Propiedades",
+  keywords: "Inmuebles de lujo, Inmobiliaria Madrid, Apartamentos en venta, Propiedades exclusivas Madrid, Aquilar piso madrid, propiedades seelectas, LHS Concept, LHS Madrid",
 
   openGraph: {
     title: "LHS Concept",
-    description: "Propiedades de Lujo en Madrid",
+    description: "Con mas de 20 años de experiencia en el mercado inmobiliario de lujo, nos especializamos en ayudar a nuestros clientes comprar y vender propiedades de lujo en las ubicaciones más exclusivas de Madrid.",
     type: "website",
     url: "https://www.lhsconcept.com",
     images: [
@@ -41,7 +42,7 @@ export const metadata: Metadata = {
         width: 2546,
         height: 1500,
         type: "image/jpeg",
-        alt: "Propiedades de Lujo en Madrid",
+        alt: "LHS Concept Madrid, propiedades selectas.",
       },
     ],
     siteName: "LHSConcept.com",
@@ -52,9 +53,9 @@ export const metadata: Metadata = {
   twitter: {
     card: "summary_large_image", // summary, summary_large_image, app, player
     site: "@lhsconcept",
-    title: "LHS Concept | Propiedades Selectas en Madrid",
+    title: "LHS Concept Madrid",
     creator: "Lourdes Hernansanz",
-    description: "Propiedades de Lujo en Madrid",
+    description: "Con mas de 20 años de experiencia en el mercado inmobiliario de lujo, nos especializamos en ayudar a nuestros clientes comprar y vender propiedades",
     images: ["/logo-main.jpeg"],
   },
 
@@ -81,7 +82,7 @@ const jsonLd = {
   '@context': 'https://schema.org',
   '@type': 'RealEstateAgent',
   name: 'LHS Concept',
-  description: 'Propiedades de Lujo en Madrid',
+  description: 'Propiedades Selectas en Madrid',
   url: 'https://www.lhsconcept.com',
   logo: 'https://www.lhsconcept.com/logo-main.jpeg',
   address: {
diff --git a/src/components/PdfPageView.tsx b/src/components/PdfPageView.tsx
index 40a68a2..7a9ebf9 100644
--- a/src/components/PdfPageView.tsx
+++ b/src/components/PdfPageView.tsx
@@ -3,7 +3,6 @@ import { Photo, Property, PropiedadHabitacion } from '#/backend/types';
 import Image from 'next/image';
 import { IconFindUs } from '@/utils/svgs';
 import { sortAndChunkPhotos } from '@/components/PdfPageAlgorithims';
-import { title } from 'node:process';
 
 interface PDFPageProps {
     children: React.ReactNode;
diff --git a/src/utils/metadata.ts b/src/utils/metadata.ts
index b360197..83a0022 100644
--- a/src/utils/metadata.ts
+++ b/src/utils/metadata.ts
@@ -24,7 +24,21 @@ export function generatePropertyMetadata(property: any, slug: string, pdf: boole
     if (!property) {
         return {
             title: 'LHS Concept',
-            description: 'Propiedades de lujo en Madrid.'
+            description: 'Encontramos propiedades exclusivas en Madrid.',
+            openGraph: {
+                title: 'LHS Concept',
+                description: 'Con ms de 20 años de experiencia en el mercado inmobiliario de lujo, nuestra reputación está garantizada por la satisfacción de nuestros clientes.\nNos especializamos en ayudar a nuestros clientes comprar y vender propiedades de lujo en las ubicaciones más exclusivas de Madrid. Con una experiencia inigualable en el mercado y una pasión por ofrecer un servicio excepcional, estamos dedicados a hacer que su experiencia inmobiliaria sea fluida y gratificante.',
+                url: `https://www.lhsconcept.com/`,
+                images: [
+                    {
+                        url: '/logo-main.jpeg',
+                        width: 800,
+                        height: 600,
+                        alt: 'LHS Concept Madrid',
+                    }
+                ],
+                type: 'website',
+            },
         };
     }
 
