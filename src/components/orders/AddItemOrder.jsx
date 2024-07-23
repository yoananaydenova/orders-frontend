import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import axios from "axios";
import { AddItemButton } from "../buttons/SimpleButton";
import { sortOptionsByName } from "../../Util";
import ErrorMessage from "../common/ErrorMessage";
import toast from "react-hot-toast";

const AddItemOrder = forwardRef(
  ({ order, setOrder, requestItems, setRequestItems, children }, ref) => {
    const [options, setOptions] = useState([]);

    const [optionsState, setOptionsState] = useState("-1");

    const defaultItem = {
      id: "-1",
      name: "",
      quantity: 0,
      price: "",
      isEditable: false,
      isValidQuantity: true,
    };

    const [selectedItem, setSelectedItem] = useState(defaultItem);

    const [isCurrentValidQuantity, setIsCurrentValidQuantity] = useState(true);

    useImperativeHandle(ref, () => {
      return {
        addOption,
        removeOption,
        setDefaultOption,
      };
    });

    const addOption = (newOption) => {
      const currentOption = options.find((opt) => opt.id === newOption.id);
      if (!currentOption) {
        setOptions((optionsList) =>
          [...optionsList, newOption].sort(sortOptionsByName)
        );
      }
    };

    const removeOption = (id) => {
      setOptions((optionsList) => optionsList.filter((item) => item.id !== id));
    };

    const setDefaultOption = () => {
      setOptionsState("-1");
      setSelectedItem(defaultItem);
    };

    useEffect(() => {
      loadItems();
    }, []);

    const loadItems = async () => {
      const result = await axios.get("http://localhost:8080/available-items");

      setRequestItems([...result.data]);

      const resultOtionItems = result.data.map((item) => ({
        name: item.name,
        id: item.id,
      }));

      setOptions(resultOtionItems);
    };

    const onChangeQuantityHandler = (e) => {
      const value = e.target.value ? Number(e.target.value) : "";
      const itemId = Number(e.target.id);

      const currentRequestedItem = requestItems.find(
        (item) => item.id === itemId
      );

      setIsCurrentValidQuantity(
        value >= 1 && value <= currentRequestedItem.quantity
      );
      setSelectedItem((prevState) => ({
        ...prevState,
        [e.target.name]: value,
      }));
    };

    const handleSelectChange = (e) => {
      let currentItem;

      if (e.target.value === "-1") {
        currentItem = defaultItem;
      } else {
        currentItem = requestItems.find((i) => i.id == e.target.value);
      }

      currentItem.isEditable = false;
      currentItem.isValidQuantity = currentItem.quantity > 0;

      setIsCurrentValidQuantity(currentItem.quantity > 0);

      setOptionsState(e.target.value);
      setSelectedItem(currentItem);
    };

    const addItemHandler = () => {
      if (selectedItem.id === "-1") {
        return;
      }

      if (!isCurrentValidQuantity) {
        return;
      }

      const orderItems = order.items;
      const currentItem = orderItems.find(
        (item) => item.id === selectedItem.id
      );

      if (currentItem) {
        currentItem.quantity += selectedItem.quantity;
      } else {
        orderItems.push({ ...selectedItem });
      }
      const currentRequestedItem = requestItems.find(
        (item) => item.id === selectedItem.id
      );
      currentRequestedItem.quantity -= selectedItem.quantity;

      setOrder((prevState) => ({
        ...prevState,
        totalAmount: sumTotal(orderItems),
        items: orderItems,
      }));

      if (currentRequestedItem.quantity === 0) {
        removeOption(currentRequestedItem.id);
      }

      setDefaultOption();

      toast.success("The item is successfully added to the order!");
    };

    const sumTotal = (arr) =>
      arr.reduce((sum, { price, quantity }) => sum + price * quantity, 0);

    return (
      <div>
        <div className="mb-3">
          <label className="form-label w-100">Item name</label>

          <select
            onChange={handleSelectChange}
            value={optionsState}
            className="form-select"
          >
            <option key="-1" value="-1" disabled>
              Choose an option
            </option>
            {options.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label w-100">
            Price
            <input
              defaultValue={selectedItem.price}
              readOnly
              type="text"
              name="price"
              className="form-control"
            />
          </label>
        </div>

        <div className="mb-3">
          <label className="form-label w-100">
            Quantity
            <input
              id={selectedItem.id}
              value={selectedItem.quantity}
              onChange={(e) => onChangeQuantityHandler(e)}
              readOnly={selectedItem.id === "-1"}
              type="number"
              name="quantity"
              className={
                isCurrentValidQuantity
                  ? "form-control"
                  : "form-control custom-error-form-validation"
              }
            />
          </label>
          {isCurrentValidQuantity ? null : (
            <ErrorMessage message={"The quantity value is incorrect!"} />
          )}
        </div>

        <div className="d-flex justify-content-evenly mt-5 mb-4">
          <AddItemButton
            disabled={selectedItem.quantity === 0 || !isCurrentValidQuantity}
            onClick={addItemHandler}
          />
          {children}
        </div>
      </div>
    );
  }
);

export default AddItemOrder;
