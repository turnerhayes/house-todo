import * as React from "react";
import { List, ListItem } from "@mui/material";
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";


function reorderList<Item>(
  list: Item[],
  sourceIndex: number,
  destinationIndex: number
): Item[] {
  // Check if the item to move is in the list.
  if (sourceIndex >= list.length || sourceIndex < 0) {
    throw new Error("The item to move is not in the list.");
  }

  // Check if the to index is in the list.
  if (destinationIndex >= list.length || destinationIndex < 0) {
    throw new Error("The to index is not in the list.");
  }

  list = [...list];

  // Move the item to the new position.
  const itemToMove = list[sourceIndex];
  const temp = list[destinationIndex];
  list[destinationIndex] = itemToMove;
  list[sourceIndex] = temp;

  return list;
}

export function DraggableList<Item>(
  {
    items,
    children: getItemContent,
    onItemsReordered,
  }: {
    items: Item[];
    children: (item: Item) => React.ReactElement;
    onItemsReordered?: (items: Item[]) => void;
  }
) {
  const handleDragEnd = React.useCallback((result: DropResult) => {
    if (!result.destination) {
      return;
    }

    let { index: sourceIndex } = result.source;
    let { index: destinationIndex } = result.destination;
    const reordered = reorderList(items, sourceIndex, destinationIndex);
    if (onItemsReordered) {
      onItemsReordered(reordered);
    }
  }, []);

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="droppable-list">
        {(provided) => (
          <>
            <List
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {items.map((item, index) => (
                <Draggable key={index} draggableId={`${index}`} index={index}>
                  {(provided) => (
                    <ListItem
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                    >
                      {getItemContent(item)}
                    </ListItem>
                  )}
                </Draggable>
              ))}
            </List>
            {provided.placeholder}
          </>
        )}
      </Droppable>
    </DragDropContext>
  );
}
