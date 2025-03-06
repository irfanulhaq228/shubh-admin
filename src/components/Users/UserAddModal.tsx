import { Modal } from "antd"

const UserAddModal = ({ open, setOpen }: any) => {
    return (
        <Modal
            centered
            open={open}
            onClose={() => setOpen(false)}
            onCancel={() => setOpen(false)}
            footer={null}
            width={600}
            style={{ fontFamily: "Roboto" }}
        >
            <p className="text-[18px] font-[500]">Add User</p>
        </Modal>
    )
}

export default UserAddModal