# @troia-v3/types

Shared TypeScript types for TROIA V3 Frontend and Backend applications.

## Installation

```bash
npm install @troia-v3/types
```

## Usage

```typescript
import { 
  UserResponse, 
  CreateUserRequest, 
  BaseApiResponse 
} from '@troia-v3/types';

// Use the types in your application
const user: UserResponse = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  // ... other properties
};

const apiResponse: BaseApiResponse<UserResponse> = {
  success: true,
  data: user,
  message: 'User retrieved successfully'
};
```

## Available Types

### Common Types
- `BaseApiResponse<T>` - Standard API response wrapper
- `PaginatedApiResponse<T>` - Paginated API response
- `PaginationQuery` - Query parameters for pagination
- `BaseDocument` - Base document interface
- `TenantAwareDocument` - Multi-tenant document interface

### Module Types
- **Apps**: App management and white-label configuration
- **Companies**: Company/tenant management
- **Users**: User authentication and management
- **Levels**: Role-based access control
- **Providers**: Third-party service integrations
- **CRM**: Customer relationship management
- **Chat**: Messaging and communication

## Development

```bash
# Build types
npm run build

# Watch for changes
npm run dev

# Clean build directory
npm run clean
```

## License

PRIVATE - Internal use only for TROIA V3 project.