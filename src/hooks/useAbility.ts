// import { useContext } from "react";
// import { GameContext } from "../contexts/GameContext";
// import getDistance from "../utils/getDistance";
// import getBoardCopy from "../utils/getBoardCopy";
// import Ability from "../interfaces/Ability";
// import Method from "../interfaces/Method";
// import ReplaceParams from "../interfaces/MethodParams/ReplaceParams";
// import GetParams from "../interfaces/MethodParams/GetParams";
// import ModifyAttributeParams from "../interfaces/MethodParams/ModifyAttributeParams";
// import WaitParams from "../interfaces/MethodParams/WaitParams";
// import AddParams from "../interfaces/MethodParams/AddParams";
// import RemoveParams from "../interfaces/MethodParams/RemoveParams";
// import Box from "../classes/Box";
// import Player from "../classes/Player";
// import Square from "../classes/Square";
// import { MethodParams } from "../types/MethodParams";
// import useBoard from "./useBoard";
// import TagParams from "../interfaces/MethodParams/TagParams";
// import isWithinRange from "../utils/isWithinRange";

// export default function useAbility() {
//   const context = useContext(GameContext);
//   if (!context) throw new Error("Context doesn't have a Provider");

//   const { setBoard, board, squareFrom, squareTo, setEffects } = context;
//   const { getInRange } = useBoard();

//   const removeTags = (params: TagParams) => {
//     const usesGetMethod = "get" in params;
//     const hasCodes = params.tags;
//     if (!usesGetMethod || !hasCodes) return;

//     const boxes = handleGetMethod(params.get as GetParams);

//     boxes.forEach((box) => {
//       box.tags = box.tags.filter((tag) => !params.tags.includes(tag));
//     });
//   };

//   const handleGetMethod = (params: GetParams): Box[] => {
//     const { getBy, tags, boxTypes, range, team } = params;

//     const filterByTeam = (box: Box) => {
//       if (box.type !== "player") return false;
//       const player = box as Player;
//       return player.team === team;
//     };

//     if (getBy === "squareTo" && squareTo) {
//       console.log(squareTo);
//       if (boxTypes?.includes(squareTo.type)) {
//         return [squareTo];
//       }
//       console.log("No boxes selected");
//       return [];
//     }

//     if (getBy === "squareFrom" && squareFrom) {
//       if (
//         boxTypes?.includes(squareFrom.type) &&
//         (!team || filterByTeam(squareFrom))
//       ) {
//         return [squareFrom];
//       }
//       console.log("No boxes selected");
//       return [];
//     }

//     if (getBy === "tag") {
//       const boxes: Box[] = [];
//       board.grid.forEach((row) =>
//         row.forEach((square) =>
//           square.boxes.forEach((box) => {
//             const hasTag = box.tags?.some((tag) => tags?.includes(tag));
//             const correctTeam = team === "any" || filterByTeam(box);

//             if (hasTag && correctTeam && box.type === "player") {
//               boxes.push(box);
//             }
//           })
//         )
//       );
//       return boxes;
//     }

//     if (getBy === "range" && squareTo && boxTypes && range) {
//       return getInRange(boxTypes, squareTo.position, range, team);
//     }

//     console.log("No boxes selected");
//     return [];
//   };

//   const handleAbility = (ability: Ability): boolean => {
//     if (!squareFrom || !squareTo) return false;
//     const distance = getDistance(squareFrom.position, squareTo.position);
//     const isInRange: boolean = isWithinRange(distance, ability.range);
//     const isValidBoxType = ability.boxTypes.includes(squareTo.type);
//     if (!isInRange || !isValidBoxType) return false;

//     let abilitySuccess = false;

//     ability.methods.forEach((method) => {
//       const methodSuccess = handleMethod(method);
//       if (methodSuccess) abilitySuccess = true;
//     });

//     return abilitySuccess;
//   };

//   const handleMethod = (method: Method): boolean => {
//     if (!squareFrom || !squareTo) return false;

//     const newBoard = getBoardCopy(board);
//     const { params, type } = method;
//     let success = false;
//     removeTags(params as TagParams);

//     const handler = methodHandlers[type];
//     if (handler) success = handler(params);
//     if (success) setBoard(newBoard);

//     return success;
//   };

//   const methodHandlers: Record<string, (params: MethodParams) => boolean> = {
//     replace: (params: MethodParams) =>
//       handleReplaceMethod(params as ReplaceParams),
//     modifyAttribute: (params: MethodParams) =>
//       handleModifyAttributeMethod(params as ModifyAttributeParams),
//     wait: (params: MethodParams) => handleWaitMethod(params as WaitParams),
//     tag: (params: MethodParams) => handleTagMethod(params as TagParams),
//     add: (params: MethodParams) => handleAddMethod(params as AddParams),
//     remove: (params: MethodParams) =>
//       handleRemoveMethod(params as RemoveParams),
//   };

//   const handleTagMethod = (params: TagParams) => {
//     const boxes = handleGetMethod(params.get);
//     let success = false;

//     boxes.forEach((box) => {
//       box.tags.push(...params.tags);
//       success = true;
//     });

//     return success;
//   };

//   const handleWaitMethod = (params: WaitParams) => {
//     if (params.type == "miliseconds") {
//       setTimeout(() => {
//         params.methods.forEach((method) => handleMethod(method));
//       }, params.time);
//     } else if (params.type == "turns") {
//       setEffects((prevEffects) => {
//         return [
//           ...prevEffects,
//           {
//             methods: params.methods,
//             turnsLeft: params.time,
//           },
//         ];
//       });
//     }

//     return true;
//   };

//   const handleReplaceMethod = (params: ReplaceParams): boolean => {
//     const boxes = handleGetMethod(params.get);
//     let success = false;

//     boxes.forEach((box) => {
//       const square = board.grid[box.position.y][box.position.x];
//       const boxIndex = square.boxes.indexOf(box);

//       square.boxes[boxIndex].type = params.to;
//       success = true;
//     });

//     return success;
//   };

//   const handleAddMethod = (params: AddParams): boolean => {
//     const boxes = handleGetMethod(params.get);
//     let success = false;
//     console.log(`AddMethodBoxes =>`);
//     console.log(boxes);

//     boxes.forEach((box) => {
//       const square: Square = board.grid[box.position.y][box.position.x];
//       const allyInSquare: Box | undefined = square.boxes.find(
//         (box) => box.type == "player" && (box as Player).team == "ally"
//       );

//       const newBox = new Box({
//         position: square.position,
//         type: params.boxType,
//       });
//       if (allyInSquare) {
//         square.boxes.unshift(newBox);
//       } else {
//         square.boxes.push(newBox);
//       }
//       success = true;
//     });

//     return success;
//   };

//   const handleRemoveMethod = (params: RemoveParams): boolean => {
//     const boxes = handleGetMethod(params.get);
//     let success = false;

//     boxes.forEach((box) => {
//       const square = board.grid[box.position.y][box.position.x];
//       square.boxes = square.boxes.filter((b) => b !== box);
//       success = true;
//     });

//     return success;
//   };

//   const handleModifyAttributeMethod = (params: ModifyAttributeParams) => {
//     const players = handleGetMethod(params.get) as Player[];
//     let success = false;

//     players.forEach((player) => {
//       player.attributes[params.attribute] += params.amount;
//       success = true;
//     });

//     return success;
//   };

//   return {
//     handleAbility,
//     handleMethod,
//     ...context,
//   };
// }
