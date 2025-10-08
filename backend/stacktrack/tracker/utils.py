from rest_framework.response import Response

def success_response(message, data=None, status_code=200):
    """
    Returns a standardized success API response.
    """
    return Response({
        "success": True,
        "message": message,
        "data": data
    }, status=status_code)


def error_response(message, errors=None, status_code=400):
    """
    Returns a standardized error API response.
    """
    return Response({
        "success": False,
        "message": message,
        "errors": errors
    }, status=status_code)
