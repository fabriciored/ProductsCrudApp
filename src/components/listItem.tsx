interface ListItemProps {
    name: string;
    price: string | number;
    header?: boolean;
}

function ListItem(props: ListItemProps) {
  return (
    <div className="flex flex-row justify-between bg-gray-200 p-2 rounded">
    <div className="flex flex-col">
    <span className={props.header ? "mx-5 font-medium text-lg" : "mx-5 text-lg"}>{props.name}</span>
    </div>
    <div className="flex flex-col  w-1/4">
    <span className={props.header ? "mx-5 font-medium text-lg" : "mx-5 text-lg"}>{props.header ? props.price : "$" + props.price}</span>
    </div>
  </div>
  )
}

export default ListItem