export const SERVER_PORT = process.env.SERVER_PORT || 5001;
export const OPENVIDU_URL = process.env.OPENVIDU_URL || 'https://vidu.veserve.cc';
export const OPENVIDU_SECRET = process.env.OPENVIDU_SECRET || 'veserve111';
export const CALL_OPENVIDU_CERTTYPE = process.env.CALL_OPENVIDU_CERTTYPE || 'letsencrypt';
export const CALL_PRIVATE_ACCESS = process.env.CALL_PRIVATE_ACCESS || 'ENABLED';
export const CALL_USER = process.env.CALL_USER || 'admin';
export const CALL_SECRET = process.env.CALL_SECRET || OPENVIDU_SECRET;
export const CALL_ADMIN_SECRET = process.env.CALL_ADMIN_SECRET || OPENVIDU_SECRET;
export const CALL_RECORDING = process.env.CALL_RECORDING || 'ENABLED';
