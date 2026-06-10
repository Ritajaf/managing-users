import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import {AddressesService } from './addresses.service';
import { CreateAddressDto } from './dto/create-address.dto';
import {JwtGuard} from '../auth/guards/jwt.guard';

@Controller('addresses')
@UseGuards(JwtGuard)
export class AddressesController {
 constructor(private addressessServices: AddressesService){}
 @Post()
 async createAddress(@Req() req, @Body() createAddressDto: CreateAddressDto) {
    return await this.addressessServices.createAddress(req.user.sub, createAddressDto);
    
 }
 @Get()
 async getMyAddresses(@Req() req: any ){
    return await this.addressessServices.getMyAdresses(req.user.sub);
 }
 @Delete(':id')
 async deleteAddress(@Req() req: any, @Param('id') id: string) {
    return await this.addressessServices.deleteAddress(req.user.sub, id);
 }
}

