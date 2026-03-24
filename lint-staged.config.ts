const config = {
  "*.{css,scss,less}": ["oxfmt"],
  "*.{html,md}": ["oxfmt"],
  "*.{js,jsx,ts,tsx}": ["oxfmt", "oxlint . --fix"],
  "*.{json,yml,yaml}": ["oxfmt"],
};

export default config;
