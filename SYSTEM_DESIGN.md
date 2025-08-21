# Insyd Notification System - System Design Document

## Overview
A real-time notification system for Insyd, a social platform for the Architecture Industry, designed to handle 100 DAUs initially with scalability to 1M DAUs.

## Components Architecture

### 1. Frontend (React)
- **Notification Center**: Display and manage notifications
- **User Dashboard**: Content creation and social interactions
- **Real-time Updates**: WebSocket connection for live notifications

### 2. Backend Services
- **API Gateway**: Route requests and handle authentication
- **Notification Service**: Core notification logic and delivery
- **User Service**: Manage user profiles and relationships
- **Content Service**: Handle posts, blogs, and user-generated content

### 3. Database Schema
```sql
-- Users table
users (id, username, email, created_at)

-- Follows table (user relationships)
follows (follower_id, following_id, created_at)

-- Posts table
posts (id, user_id, content, created_at)

-- Notifications table
notifications (id, user_id, type, related_user_id, related_post_id, message, read, created_at)
```

### 4. Real-time Infrastructure
- **WebSocket Connections**: For instant notification delivery
- **Message Queue**: Handle notification processing asynchronously
- **Push Notification Service**: Browser/mobile push notifications

## Execution Flow

### 1. Notification Triggers
```
User Action → Content Service → Notification Service → Queue → Delivery
```

**Trigger Events:**
- New follower
- Post liked/commented
- New post from followed user
- Mention in post/comment

### 2. Notification Processing
1. **Event Detection**: API endpoints capture user actions
2. **Recipient Calculation**: Determine who should be notified
3. **Notification Creation**: Generate notification records
4. **Delivery**: Real-time push via WebSockets + database storage

### 3. Delivery Mechanisms
- **Real-time**: WebSocket for active users
- **Batch**: Periodic email digests for inactive users
- **Push**: Browser notifications for engagement

## Scale Considerations

### Current Scale (100 DAUs)
- **Database**: Single PostgreSQL instance
- **Backend**: Single Node.js server
- **Caching**: In-memory caching sufficient
- **Real-time**: Direct WebSocket connections

### Target Scale (1M DAUs)
- **Database**: Read replicas + sharding by user_id
- **Backend**: Microservices with load balancing
- **Caching**: Redis cluster for session/notification cache
- **Real-time**: Message broker (Redis Pub/Sub) + WebSocket clusters
- **CDN**: Static content delivery

## Performance Optimizations

### 1. Database Optimization
- **Indexing**: user_id, created_at, read status
- **Partitioning**: Notifications table by date
- **Archiving**: Move old notifications to cold storage

### 2. Caching Strategy
- **User sessions**: 24-hour cache
- **Unread count**: Real-time cache with 5-minute fallback
- **User relationships**: Cache follow lists

### 3. Delivery Optimization
- **Batching**: Group notifications by user
- **Throttling**: Rate limit per user (max 10/hour)
- **Priority**: Critical notifications bypass throttling

## Limitations & Trade-offs

### Current Limitations
1. **Single Point of Failure**: Monolithic backend
2. **Storage Growth**: Notifications accumulate indefinitely
3. **Real-time Dependency**: Requires persistent connections

### Design Trade-offs
1. **Consistency vs Performance**: Eventual consistency for better performance
2. **Storage vs Speed**: Store redundant data for faster queries
3. **Real-time vs Resources**: WebSocket overhead for instant delivery

## Technology Stack

### POC Implementation
- **Frontend**: React + TypeScript + Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Real-time + Auth)
- **Real-time**: Supabase Real-time subscriptions
- **Deployment**: Vercel (Frontend) + Supabase (Backend)

### Production Considerations
- **Backend**: Node.js + Express
- **Database**: PostgreSQL with Redis
- **Message Queue**: Redis/RabbitMQ
- **Monitoring**: Application performance monitoring
- **Security**: Rate limiting, input validation, CORS

## Monitoring & Analytics

### Key Metrics
- **Notification Delivery Rate**: % successfully delivered
- **Real-time Connection Health**: Active WebSocket connections
- **User Engagement**: Click-through rates on notifications
- **System Performance**: Response times, error rates

### Alerting Thresholds
- Notification delivery < 95%
- Response time > 2 seconds
- Error rate > 1%
- Active connections drop > 20%