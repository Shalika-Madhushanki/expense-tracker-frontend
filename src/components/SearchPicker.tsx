import React, { useCallback, useState, useRef, useEffect } from "react";
import { Button, Modal, List, SearchBar } from "antd-mobile";

import { CategoryItem } from "../constants/sheet";

const EMPTY_ITEM = {
  text: "Not a valid type",
  value: "Not a valid type",
  disabled: true,
};

interface SearchPickerProps {
  data: CategoryItem;
  items: CategoryItem[];
  instruction: string;
  label: string;
  onSelect: (value: CategoryItem) => void;
}

const SearchPicker: React.FC<SearchPickerProps> = ({
  data,
  items,
  instruction,
  label,
  onSelect,
}) => {
  const searchRef = useRef(null);

  const [visible, setVisible] = useState(false);
  const [filterredItems, setFilterredItems] = useState(items);

  useEffect(() => {
    if (!visible) {
      setTimeout(() => {
        searchRef.current?.clear();
      }, 300);
    }
  }, [visible]);

  const ModalHeader = useCallback(() => {
    return (
      <SearchBar
        ref={searchRef}
        placeholder=""
        onChange={(query) => {
          const res = items.filter((item) =>
            item.value.toLowerCase().startsWith(query.toLowerCase()),
          );
          setFilterredItems(res?.length > 0 ? res : [EMPTY_ITEM]);
        }}
        style={{ "--height": "40px" }}
      />
    );
  }, [items]);

  const ModalContent = useCallback(() => {
    return (
      <List style={{ height: 400 }}>
        {filterredItems.map((i, index) => (
          <List.Item
            key={index}
            arrowIcon={false}
            style={{ color: data?.value === i.value ? "#ff8f1f" : "white" }}
            disabled={i.disabled}
            onClick={() => {
              onSelect(i);
              setVisible(false);
            }}
          >
            {i.text}
          </List.Item>
        ))}
      </List>
    );
  }, [filterredItems, data]);

  return (
    <div style={styles.container}>
      <div style={styles.label}>{label}</div>
      <Button
        block
        onClick={() => {
          setVisible(true);
        }}
      >
        {data ? data.text : "Please Select"}
      </Button>

      <Modal
        visible={visible}
        closeOnMaskClick
        header={<ModalHeader />}
        content={<ModalContent />}
        closeOnAction
        onClose={() => {
          setVisible(false);
        }}
        afterShow={() => {
          searchRef.current?.focus();
        }}
      />
    </div>
  );
};

const styles = {
  container: {
    marginBottom: 10,
  },
  label: {
    fontSize: "16px",
    color: "#999",
    marginBottom: 12,
  },
};

export default SearchPicker;
