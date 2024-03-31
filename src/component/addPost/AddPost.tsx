import React, { useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Form, Input, Button } from 'antd';
import "./AddPost.sass"
import { Modal, } from 'antd';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../Redux/store';
import putPostReducer, { PromiseStatus } from '../../Redux/putPost';
import { postAPI } from '../../Redux/API';
import { createPostAsync } from '../../Redux/putPost';
export type FormData = {
    userId: 1;
    title: string;
    body: string;
}

const PostForm: React.FC = () => {
    const { control, handleSubmit, formState: { errors, isDirty }, reset } = useForm<FormData>({
        defaultValues: {
            title: '',
            body: ''
        }
    });
    const dispatch = useDispatch<AppDispatch>()
    const { postStatus } = useSelector((state: RootState) => state.post)
    const [submitting, setSubmitting] = useState(false);



    const [modal, contextHolder] = Modal.useModal();
    const navigate = useNavigate()

    const handleOnOK = () => {
        if (postStatus === PromiseStatus.Success) {
            modal.success({
                title: "Successfully",
                content: "You add posts successfully",
                onOk: () => {
                    setTimeout(() => {
                        navigate('/'); setSubmitting(false);
                        reset()
                    }, 1500)
                }
            })
        } else {
            modal.error({
                title: "Error",
                content: "Something went wrong",
                onOk: () => { reset(); setSubmitting(false) }
            })
        }
    }

    const onSubmit: SubmitHandler<FormData> = (data) => {
        modal.confirm({
            title: "Add Post",
            content: 'Are you want to add post ?',
            onOk: () => {
                dispatch(createPostAsync(data));
                setSubmitting(true)
                handleOnOK();

            }

        })
    };

    return (
        <div className='form'>
            <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
                <Form.Item
                    label="Title"
                    validateStatus={errors.title ? "error" : ""}
                    help={errors.title && "Title is required"}
                >
                    <Controller
                        control={control}
                        name="title"
                        rules={{ required: true }}
                        render={({ field }) => <Input {...field} />}
                    />
                </Form.Item>
                <Form.Item
                    label="Body"
                    validateStatus={errors.body ? "error" : ""}
                    help={errors.body && "Body is required"}
                >
                    <Controller
                        control={control}
                        name="body"
                        rules={{ required: true }}
                        render={({ field }) => <Input.TextArea {...field} style={{ height: '200px' }} />}
                    />
                </Form.Item>
                <Form.Item>
                    <div className='Button'>
                        <Button type="primary" style={{ backgroundColor: "gray", marginRight: '20px' }}
                            onClick={() => {
                                isDirty ?
                                    modal.confirm({
                                        title: "Cancel Add Post",
                                        content: 'Are you want to cancel ?',
                                        onOk: () => navigate('/')
                                    }) : navigate('/')
                            }}
                            disabled={submitting}>
                            Cancel
                        </Button>
                        <Button type="primary" htmlType="submit" loading={submitting}>
                            Submit
                        </Button>
                    </div>

                </Form.Item>
            </Form>
            {contextHolder}

        </div>

    );
};

export default PostForm;
