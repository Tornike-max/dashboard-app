import { ColorPicker, Space, Button, Typography } from "antd";
import { Color } from "antd/es/color-picker";
import { useState } from "react";
import { HiOutlinePencil } from "react-icons/hi2";

const { Title } = Typography;

export default function ClrPicker() {
  const [value, setValue] = useState<Color>();

  const handleReset = () => {
    setValue(undefined); // Reset the color to undefined
  };

  return (
    <div className="max-w-[2200px] w-full flex justify-center items-center flex-col">
      <Title level={2} style={{ color: value?.toRgbString() }}>
        Hello, world!
      </Title>

      <HiOutlinePencil size={32} color={value?.toRgbString()} />

      <Space
        direction="vertical"
        align="center"
        size="large"
        style={{ marginTop: "20px" }}
      >
        <ColorPicker
          onChange={(color) => setValue(color)}
          value={value}
          size="large"
          showText
        />
        <Button type="primary" onClick={handleReset}>
          Reset
        </Button>
      </Space>
    </div>
  );
}
