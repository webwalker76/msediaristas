import { ThemeProvider } from "@material-ui/core/styles";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";

import theme from "./theme";
import React from "react";

const StoryThemeProvider = (storyFn: any) => (
  <ThemeProvider theme={theme}>
    <EmotionThemeProvider theme={theme}>{storyFn()}</EmotionThemeProvider>
  </ThemeProvider>
);

export default StoryThemeProvider;
