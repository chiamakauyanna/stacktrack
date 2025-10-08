from rest_framework.views import exception_handler
from rest_framework.response import Response

def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)

    if response is not None:
        return Response({
            "success": False,
            "message": "An error occurred.",
            "errors": response.data
        }, status=response.status_code)
    else:
        return Response({
            "success": False,
            "message": "Internal server error.",
            "errors": str(exc)
        }, status=500)
