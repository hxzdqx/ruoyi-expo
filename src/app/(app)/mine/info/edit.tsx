import {
  View,
  Button,
  Form,
  Radio,
  Input,
  Toast,
} from "@ant-design/react-native";
import { StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { getUserProfile, updateUserProfile } from "@/src/api/system/user";

interface UserType {
  nickName: string;
  phonenumber: string;
  email: string;
  sex: string;
}

export default function MineInfoEditScreen() {
  const [form] = Form.useForm();
  const [user, serUser] = useState<UserType>({
    nickName: "",
    phonenumber: "",
    email: "",
    sex: "1",
  });
  // 获取用户信息
  const getUser = async () => {
    try {
      const res = await getUserProfile();
      serUser(res.data);
    } catch (error) {
      console.log("getUser", error);
    }
  };
  // 提交
  const onFinish = async (values: any) => {
    console.log("Success:", values);
    try {
      await updateUserProfile(user);
      Toast.success("修改成功");
    } catch (error) {
      console.log("updateUserProfile error", error);
      Toast.fail("修改失败");
    }
  };
  // 提交失败
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  // 提交按钮
  const submitButton = () => {
    form.submit();
  };

  useEffect(() => {
    getUser();
  }, []);
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
        <Form.Item label="用户昵称：" name="nickName">
          <Input
            type="text"
            placeholder="请输入用户昵称"
            value={user.nickName}
            allowClear
            onChangeText={(value) => serUser({ ...user, nickName: value })}
          />
        </Form.Item>
        <Form.Item label="手机号码：" name="phonenumber">
          <Input
            type="text"
            placeholder="请输入手机号码"
            value={user.phonenumber}
            maxLength={11}
            allowClear
            onChangeText={(value) => serUser({ ...user, phonenumber: value })}
          />
        </Form.Item>
        <Form.Item label="邮箱：" name="email">
          <Input
            type="text"
            placeholder="请输入邮箱"
            value={user.email}
            allowClear
            onChangeText={(value) => serUser({ ...user, email: value })}
          />
        </Form.Item>
        <Form.Item label="性别：" name="sex" rules={[{ required: true }]}>
          <Radio.Group
            onChange={(e) =>
              serUser({ ...user, sex: e.target.value as string })
            }
            value={user.sex}
            style={{ flexDirection: "row" }}
          >
            <Radio value="0">男</Radio>
            <Radio value="1">女</Radio>
          </Radio.Group>
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
