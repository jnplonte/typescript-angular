export class ApiModel {
    'status': string;
    'message': string;
    'data': any;

    constructor(data: { status?: string, message?: string, data?: any } = {}) {
        this.status = data.status || 'success';
        this.message = data.message || '';
        this.data = data.data || {};
    }
}
