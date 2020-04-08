import { fetch } from './request';

const getPageData = (sql: string, pageIndex: number = 1, pageSize: number = 10) => (
    fetch(sql, {
        params: {
            pageIndex,
            pageSize,
        },
    }).then((v: any) => v.data)
);