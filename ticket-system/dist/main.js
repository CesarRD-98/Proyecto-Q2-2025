"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users/users.service");
const area_entity_1 = require("./areas/area.entity");
const bcrypt = require("bcrypt");
const logger_interceptor_1 = require("./common/interceptors/logger.interceptor");
const typeorm_1 = require("typeorm");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.useGlobalInterceptors(new logger_interceptor_1.LoggerInterceptor());
    const usersService = app.get(users_service_1.UsersService);
    const dataSource = app.get(typeorm_1.DataSource);
    const adminEmail = 'admin@gmail.com';
    const admin = await usersService.findByEmail(adminEmail);
    if (!admin) {
        const hashedPassword = await bcrypt.hash('admin123', 10);
        await usersService.create({
            name: 'Administrador',
            email: adminEmail,
            password: 'admin123',
            role: 'admin',
        });
        console.log('✅ Usuario admin creado:', adminEmail);
    }
    else {
        console.log('ℹ️ Usuario admin ya existe:', adminEmail);
    }
    const areaRepo = dataSource.getRepository(area_entity_1.Area);
    const existingAreas = await areaRepo.count();
    if (existingAreas === 0) {
        await areaRepo.insert([
            { name: 'Sistemas' },
            { name: 'Soporte Técnico' },
            { name: 'Infraestructura' },
        ]);
        console.log('✅ Áreas insertadas correctamente');
    }
    else {
        console.log('ℹ️ Áreas ya existentes');
    }
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map