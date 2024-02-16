import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import { useStateContext } from "../contexts/useToggleSidebar";
import { cartData } from "../data/dummy";
import {
  HiOutlineMinus,
  HiOutlinePlus,
  HiOutlineShoppingCart,
  HiOutlineXCircle,
} from "react-icons/hi2";
import { Button } from "@mui/material";
import toast from "react-hot-toast";

export default function Cart() {
  const { setIsClicked, isClicked } = useStateContext();
  const [state, setState] = React.useState({
    right: Boolean(isClicked.cart),
  });
  const [data, setData] = React.useState(cartData);

  React.useEffect(() => {
    setState({ right: Boolean(isClicked.cart) });
  }, [isClicked.cart]);

  function handleIncCount(category: string, value: number) {
    setData((data) =>
      data.map((item) => ({
        ...item,
        count: item.category === category ? item.count + 1 : item.count,
        total: item.category === category ? item.total + value : item.total,
      }))
    );
  }

  function handleDecCount(category: string, value: number) {
    setData((data) =>
      data.map((item) => ({
        ...item,
        count:
          item.category === category && item.count > 1
            ? item.count - 1
            : item.count,
        total:
          item.category === category && item.count > 1
            ? item.total - value
            : item.total,
      }))
    );
  }

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setIsClicked((clicked) => ({
        ...clicked,
        cart: open,
      }));
    };

  const handleClose = () => {
    setIsClicked((clicked) => ({
      ...clicked,
      cart: false,
    }));
  };

  const totals = data.reduce((accum, cur) => accum + cur.total, 0);

  function handlePlaceOrder() {
    handleClose();
    toast.success("Your Order Has Been Placed");
  }

  const list = (
    <Box sx={{ width: "auto", padding: "8px" }} role="presentation">
      <div className="w-full flex justify-between items-center py-8 px-4">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-semibold">Shopping Cart</h1>
          <HiOutlineShoppingCart className="text-2xl font-semibold text-blue-500" />
        </div>
        <button onClick={handleClose}>
          <HiOutlineXCircle className="text-2xl text-red-500" />
        </button>
      </div>
      <List>
        {data.map((value) => (
          <React.Fragment key={value.name}>
            <ListItem disablePadding>
              <ListItemButton>
                <div className="flex items-center gap-4">
                  <img
                    src={value.image}
                    alt={value.name}
                    className="w-14 h-14 rounded-full"
                  />
                  <div className="flex flex-col justify-center items-start">
                    <p className="text-base font-semibold">{value.name}</p>
                    <span className="text-sm text-slate-700">
                      {value.category}
                    </span>
                    <div className="flex items-center py-2 gap-6">
                      <span className="font-semibold">${value.total}</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            handleDecCount(value.category, value.price)
                          }
                          className="p-1 border-2 border-blue-500 hover:border-blue-600 rounded-md bg-none hover:bg-blue-500 hover:text-white text-xl duration-100 transition-all"
                        >
                          <HiOutlineMinus />
                        </button>
                        <span>{value.count}</span>
                        <button
                          onClick={() =>
                            handleIncCount(value.category, value.price)
                          }
                          className="p-1 border-2 border-blue-500 hover:border-blue-600 rounded-md bg-none hover:bg-blue-500 hover:text-white text-xl duration-100 transition-all"
                        >
                          <HiOutlinePlus />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </ListItemButton>
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
      <List>
        <ListItem disablePadding>
          <div className="w-full flex justify-center items-center flex-col gap-4 px-4">
            <div className="w-full flex justify-between items-start font-semibold">
              <span>Sub Total:</span>
              <span>${totals}</span>
            </div>
            <div className="w-full flex justify-between items-start font-semibold">
              <span>Total:</span>
              <span>${totals}</span>
            </div>
            <Button
              onClick={handlePlaceOrder}
              variant="contained"
              color="primary"
              className="w-full px-4"
            >
              Place order
            </Button>
          </div>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      <React.Fragment>
        <SwipeableDrawer
          anchor={"right"}
          open={state.right}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
        >
          {list}
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
}
