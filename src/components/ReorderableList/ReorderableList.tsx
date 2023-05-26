import * as React from "react";
import { Button, IconButton, List, ListItem, ListItemIcon, Stack } from "@mui/material";
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";

export function ReorderableList<T>(
  {
    items,
    children,
    onReorder,
  }: {
    items: T[];
    children: (item: T) => React.ReactElement;
    onReorder: (reorderedItems: T[]) => void;
  }) {

  const moveUp = React.useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    const indexString = event.currentTarget.dataset["index"];
    if (!indexString) {
      throw new Error('No index data specified on reorder up button');
    }
    const index = parseInt(indexString, 10);
    if (index === 0) {
      throw new Error('Cannot move item up; it is already at the top');
    }
    if (index < 0 || index >= items.length) {
      throw new Error(`Index ${index} is not in the list`);
    }

    const tempItems = [...items];
    const itemToMove = tempItems[index];
    tempItems[index] = tempItems[index - 1];
    tempItems[index - 1] = itemToMove;
    onReorder(tempItems);
  }, []);

  const moveDown = React.useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    const indexString = event.currentTarget.dataset["index"];
    if (!indexString) {
      throw new Error('No index data specified on reorder up button');
    }
    const index = parseInt(indexString, 10);
    if (index >= items.length - 1) {
      throw new Error('Cannot move item down; it is already at the bottom');
    }
    if (index < 0 || index >= items.length) {
      throw new Error(`Index ${index} is not in the list`);
    }

    const tempItems = [...items];
    const itemToMove = tempItems[index];
    tempItems[index] = tempItems[index + 1];
    tempItems[index + 1] = itemToMove;
    onReorder(tempItems);
  }, []);

  return (
    <List>
      {
        items.map((item, index) => (
          <ListItem key={index}>
            <Stack>
              {
                index > 0 && (
                  <IconButton size="small" onClick={moveUp} data-index={index}>
                    <ArrowDropUp />
                  </IconButton>
                )
              }
              {
                index < items.length - 1 && (
                  <IconButton size="small" onClick={moveDown} data-index={index}>
                    <ArrowDropDown />
                  </IconButton>
                )
              }
            </Stack>
            {children(item)}
          </ListItem>
        ))
      }
    </List>
  );
}
