import React from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { GripVertical } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { StatusBarComponent } from '../../../../types';

interface StatusComponentListProps {
  components: StatusBarComponent[];
  onToggle: (componentId: string, enabled: boolean) => void;
  onReorder: (components: StatusBarComponent[]) => void;
}

export const StatusComponentList: React.FC<StatusComponentListProps> = ({
  components,
  onToggle,
  onReorder,
}) => {
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(components);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    onReorder(items);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="status-components">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="border rounded-lg divide-y"
          >
            {components.map((component, index) => (
              <Draggable
                key={component.id}
                draggableId={component.id}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className="flex items-center justify-between p-3 bg-white"
                  >
                    <div className="flex items-center gap-2">
                      <span {...provided.dragHandleProps}>
                        <GripVertical className="w-4 h-4 text-gray-400" />
                      </span>
                      <span className="text-sm">{component.name}</span>
                    </div>
                    <Switch
                      checked={component.enabled}
                      onCheckedChange={(checked) => 
                        onToggle(component.id, checked)
                      }
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}