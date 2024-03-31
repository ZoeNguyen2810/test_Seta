import React, { useEffect } from 'react';
import { Button, Table } from 'antd';
import type { ColumnType } from 'antd/es/table';
import './PostInfo.sass'
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../Redux/store';
import { getApiAsync } from '../Redux/postSlice';

export type PostInfo = {
    userId: number,
    id: number,
    title: string,
    body: string,
    name?: string
}


const columns: ColumnType<PostInfo>[] = [
    {
        title: 'ID',
        dataIndex: 'id' as keyof PostInfo,
        width: 100,
    },
    {
        title: 'Title',
        dataIndex: 'title' as keyof PostInfo,
        ellipsis: true,
        width: 450
    },
    {
        title: "Body",
        dataIndex: 'body' as keyof PostInfo,
        ellipsis: true
    },
];


export const PostInfo = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { postData, postStatus } = useSelector((state: RootState) => state.get)

    useEffect(() => {
        dispatch(getApiAsync());


    }, [postData])

    const navigate = useNavigate()
    return (
        <>
            <div className='table'>
                <Button type='primary' style={{ float: 'right', marginBottom: '30px', width: '100px' }}
                    onClick={() => navigate("/add-post")}>Add Post</Button>

                <Table dataSource={postData} columns={columns} className='in' pagination={{ pageSize: 10 }} />
            </div>
        </>

    )
}
