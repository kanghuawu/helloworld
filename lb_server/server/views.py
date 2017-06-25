# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Activity
from .serializers import ActivitySerializer


class ActivityREST(APIView):
    def get(self, request):
        try:
            activities = Activity.objects.all()
            serializers = ActivitySerializer(activities, many=True)
            return Response(serializers.data)
        except Activity.DoesNotExist:
            raise Http404

    def post(self, request):
        serializer = ActivitySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ActivityDetailREST(APIView):
    def get_object(self, id):
        try:
            return Activity.objects.get(activity_id=id)
        except Activity.DoesNotExist:
            raise Http404

    def get(self, request, id):
        activity = self.get_object(id)
        serializer = ActivitySerializer(activity)
        return Response(serializer.data)

    def delete(self,request, id):
        activity = self.get_object(id)
        activity.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
