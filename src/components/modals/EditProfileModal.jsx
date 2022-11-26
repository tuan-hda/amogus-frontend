import React from "react";
import { Modal, Button, Text, Input, Row, Checkbox, Textarea } from "@nextui-org/react";
import Avatar from "../Avatar";

const EditProfileModal = ({ visible, closeHandler }) => {
  return (
    <Modal
    width="600px"
      closeButton
      aria-labelledby="modal-title"
      open={visible}
      onClose={closeHandler}
    >
      <Modal.Header>
        <Text id="modal-title" b size={18}>
          Chỉnh sửa hồ sơ
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Avatar custom={'mx-auto w-[160px]'}/>
        <Input
          label="Tên"
          clearable
          bordered
          fullWidth
          color="success"
          size="lg"
          placeholder="Tên"
          css={{$$inputLabelColor:'Black'}}
          //   contentLeft={<Mail fill="currentColor" />}
        />
        <Textarea
          label="Tiểu sử"
          clearable
          bordered
          fullWidth
          color="success"
          size="lg"
          maxLength={160}
          placeholder="Tiểu sử"
          css={{$$inputLabelColor:'Black'}}
          //   contentLeft={<Password fill="currentColor" />}
        />
        <Input
          label="Vị trí"
          clearable
          bordered
          fullWidth
          color="success"
          size="lg"
          placeholder="Vị trí"
          css={{$$inputLabelColor:'Black'}}
          //   contentLeft={<Mail fill="currentColor" />}
        />
        {/* <Row justify="space-between">
          <Checkbox>
            <Text size={14}>Remember me</Text>
          </Checkbox>
          <Text size={14}>Forgot password?</Text>
        </Row> */}
      </Modal.Body>
      <Modal.Footer>
        <Button auto flat color="error" onClick={closeHandler}>
          Hủy
        </Button>
        <Button auto onClick={closeHandler} css={{background:'#108944'}}>
          Lưu
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditProfileModal;
