import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function SortableRow(props) {

   const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition
   } = useSortable({
      id: props["data-row-key"]
   });

   const style = {
      ...props.style,
      transform: CSS.Transform.toString(transform),
      transition,
      cursor: "move"
   };

   return (
      <tr
         {...props}
         ref={setNodeRef}
         style={style}
         {...attributes}
         {...listeners}
      />
   );
}