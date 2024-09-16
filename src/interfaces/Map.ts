import Box from "./Box";

export default interface Map {
  color: [`#${string}`, `#${string}`];
  grid: [
    [Box, Box, Box, Box, Box, Box, Box],
    [Box, Box, Box, Box, Box, Box, Box],
    [Box, Box, Box, Box, Box, Box, Box],
    [Box, Box, Box, Box, Box, Box, Box],
    [Box, Box, Box, Box, Box, Box, Box]
  ];
}
