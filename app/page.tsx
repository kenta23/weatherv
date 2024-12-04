'use client'

import Weather from "@/components/weather";
import { animated, useSpring } from "@react-spring/web";
import { useEffect, useState } from "react";

export default function Page() {
  const [coords, setCoords] = useState<number[]>([0, 0]);

  const springs = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 2000 },
  })

  useEffect(() => { 
    navigator.geolocation.getCurrentPosition((pos) => { 
       setCoords([pos.coords.latitude, pos.coords.longitude]);
    }, error);
    
    function error () { 
       fetchCoordsByIp();
    }

    //set other option like fetching coords via ip address
    async function fetchCoordsByIp() { 
       const res = await fetch("https://ipwho.is/");

       const pos = await res.json();
       setCoords([pos.latitude, pos.longitude]);
    }

  }, []);
   
  return (
      <animated.div style={springs} className="w-full overflow-hidden h-full min-h-screen">
        <Weather lat={coords[0]} lon={coords[1]} />
      </animated.div>
  );
}
