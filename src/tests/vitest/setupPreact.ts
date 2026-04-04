import * as PreactCompat from "preact/compat";

(globalThis as typeof globalThis & { React?: typeof PreactCompat }).React = PreactCompat;
