import { View, Form, Input, Button, Toast } from "@ant-design/react-native";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { updateUserProfile } from "@/src/api/system/user";

export default function MinePasswordScreen() {
  const [form] = Form.useForm();
  const [user, setUser] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  // 校验成功
  const onFinish = async (values: any) => {
    console.log("Success:", values);
    try {
      await updateUserProfile(user);
      Toast.success("修改成功");
    } catch (error) {
      Toast.fail("修改失败");
    }
  };
  // 校验失败
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  // 校验密码
  const checkPassword = (rule: any, value: any) => {
    if (user.newPassword !== value) {
      return Promise.reject("两次输入的密码不一致");
    }
    return Promise.resolve();
  };

  // 提交按钮
  const submitButton = () => {
    form.submit();
  };
  return (
    <View style={styles.container}>
      <Form
        style={styles.form}
        name="userForm"
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        initialValues={user}
      >
        <Form.Item
          label="旧密码"
          name="oldPassword"
          rules={[{ required: true }]}
        >
          <Input
            type="password"
            placeholder="请输入用户昵称"
            value={user.oldPassword}
            allowClear
            onChangeText={(value) => setUser({ ...user, oldPassword: value })}
          />
        </Form.Item>
        <Form.Item
          label="新密码"
          name="newPassword"
          rules={[{ required: true }]}
        >
          <Input
            type="password"
            placeholder="请输入用户昵称"
            value={user.newPassword}
            allowClear
            onChangeText={(value) => setUser({ ...user, newPassword: value })}
          />
        </Form.Item>
        <Form.Item
          label="确认密码"
          name="confirmPassword"
          rules={[
            { required: true },
            { validator: checkPassword, message: "两次输入的密码不一致" },
          ]}
        >
          <Input
            type="password"
            placeholder="请输入用户昵称"
            value={user.confirmPassword}
            allowClear
            onChangeText={(value) =>
              setUser({ ...user, confirmPassword: value })
            }
          />
        </Form.Item>
      </Form>
      <View style={styles.submitBox}>
        <Button
          style={styles.submitButton}
          onPress={submitButton}
          type="primary"
        >
          提交
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  form: {
    width: "100%",
  },
  submitBox: {
    width: "100%",
    marginTop: 25,
    paddingHorizontal: 15,
  },
  submitButton: {
    width: "100%",
  },
});
