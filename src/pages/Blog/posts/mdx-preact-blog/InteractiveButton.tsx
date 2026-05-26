import type { FunctionalComponent } from "preact";

import { useState } from "preact/hooks";

import { Button } from "@/components/Button";

export const InteractiveButton: FunctionalComponent = () => {
  const [clicked, setClicked] = useState(false);

  return (
    <div class="py-4">
      <Button class="interactive interactive-lg" onClick={() => setClicked(true)}>
        {clicked ? "Clicked! 🎉" : "Click Me!"}
      </Button>
    </div>
  );
};

export default InteractiveButton;
