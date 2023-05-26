module.exports = {
  "stories": [
    "../src/components/DraggableList/DraggableList.stories.mdx",
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-docs"
  ],
  "framework": "@storybook/react",
  core: {
    builder: {
      name: "webpack5"
    }
  }
};