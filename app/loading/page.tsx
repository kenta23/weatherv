'use client'

import BackgroundProvider from "@/clientProvider/provider";
import LoadingUi from "@/components/loading-ui";

export default function loading() {
  return (
     <BackgroundProvider>
       <LoadingUi />
     </BackgroundProvider>
  )     
}
