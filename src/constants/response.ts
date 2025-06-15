import { date } from "joi";

const HTTP_STATUS_CODE = {
    OK: 200,
    CREATED: 201,
    UPDATED: 202,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    PAYMENT_REQUIRED: 402,
    ACCESS_FORBIDDEN: 403,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    UNREGISTERED: 410,
    PAYLOAD_TOO_LARGE: 413,
    CONCURRENT_LIMITED_EXCEEDED: 429,
    INTERNAL_SERVER_ERROR: 500,
    BAD_GATEWAY: 502,
    SHUTDOWN: 503,
    ACCOUNT_NOT_VERIFIED: 601,
    EMAIL_NOT_VERIFIED: 602,
    MOBILE_NOT_VERIFIED: 603,
    FRIEND_REQUEST_ERR: 604,
    FAV_USER_NOT_FOUND: 605,
};

export const RESPONSE_MESSAGES = {
    ERROR: {
        UNAUTHORIZED_ACCESS: {
            "statusCode": HTTP_STATUS_CODE.UNAUTHORIZED,
            "type": "UNAUTHORIZED_ACCESS",
            "message": "unauthorized access Token "
        },
        ACCESS_FORBIDDEN: {
            "statusCode": HTTP_STATUS_CODE.ACCESS_FORBIDDEN,
            "type": "ACCESS_FORBIDDEN"
        },
        INTERNAL_SERVER_ERROR: {
            "statusCode": HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
            "type": "INTERNAL_SERVER_ERROR",
            "message": "Internal Server Error"
        },
        BAD_TOKEN: {
            "statusCode": HTTP_STATUS_CODE.UNAUTHORIZED,
            "type": "BAD_TOKEN"
        },
        TOKEN_EXPIRED: {
            "statusCode": HTTP_STATUS_CODE.UNAUTHORIZED,
            "type": "TOKEN_EXPIRED"
        },
        TOKEN_GENERATE_ERROR: {
            "statusCode": HTTP_STATUS_CODE.BAD_REQUEST,
            "type": "TOKEN_GENERATE_ERROR"
        },
        SESSION_EXPIRED: {
            "statusCode": HTTP_STATUS_CODE.UNAUTHORIZED,
            "type": "SESSION_EXPIRED"
        },
        ERROR: (value: any, code = HTTP_STATUS_CODE.BAD_REQUEST) => {
            return {
                "statusCode": code,
                "message": value,
                "type": "ERROR"
            };
        },

        INVALID_BODY: {
            "statusCode": HTTP_STATUS_CODE.BAD_REQUEST,
            "type": "INVALID BODY PARAMETER"
        },
        
    },
    SUCCESS: {
        DEFAULT: {
            "statusCode": HTTP_STATUS_CODE.OK,
            "type": "DEFAULT"
        },
       
        // badge
        BADGE_CREATED: {
            "statusCode": HTTP_STATUS_CODE.CREATED,
            "type": "BADGE_CREATED"
        },
        BADGE_UPDATED: {
            "statusCode": HTTP_STATUS_CODE.UPDATED,
            "type": "BADGE_UPDATED"
        },
        BADGE_DELETED: {
            "statusCode": HTTP_STATUS_CODE.OK,
            "type": "BADGE_DELETED"
        },
        BADGE_STATUS_UPDATED: {
            "statusCode": HTTP_STATUS_CODE.UPDATED,
            "type": "BADGE_STATUS_UPDATED"
        },
        FETCH_BADGE:(data: any) => {
            return {
                "statusCode": HTTP_STATUS_CODE.OK,
                "type": "FETCH_BADGE",
                "data": data
            };
        },
    }

}