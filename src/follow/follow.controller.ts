import { Controller, Delete, Param, Post, Req, UseGuards } from '@nestjs/common';
import { FollowService } from './follow.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Follow')
@Controller('api/v1/follows')
export class FollowController {
    constructor(
        private followService: FollowService
    ) {}

    @UseGuards(AuthGuard)
    @Post("/:following_id")
    async followUser(@Param('following_id') following_id: number,@Req() req: any) {
        return await this.followService.followUser(req.user_data.id, following_id);
    }

    @UseGuards(AuthGuard)
    @Delete('/:following_id')
    async unfollowUser(@Param('following_id') following_id: number,@Req() req: any) {
        return await this.followService.unfollowUser(req.user_data.id, following_id);
    }
}
