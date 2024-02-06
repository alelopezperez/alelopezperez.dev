use bevy::{
    prelude::*,
    sprite::{MaterialMesh2dBundle, Mesh2dHandle},
    window::PrimaryWindow,
};

fn main() {
    App::new()
        .add_plugins(DefaultPlugins)
        .add_systems(Startup, setup)
        .add_systems(
            Update,
            (move_player_left, confine_players, move_pong, collision_pong),
        )
        .run();
}

#[derive(Component)]
struct Angle(f32);

fn setup(
    mut commands: Commands,
    mut meshes: ResMut<Assets<Mesh>>,
    mut materials: ResMut<Assets<ColorMaterial>>,
) {
    // We need a camera or else everythin will be a black screen
    commands.spawn(Camera2dBundle::default());

    // Draw a rectangle
    commands.spawn(SpriteBundle {
        sprite: Sprite {
            custom_size: Some(Vec2::new(100.0, 200.0)),
            ..default()
        },
        transform: Transform {
            translation: Vec3::new(-500.0, 0.0, 0.0),
            ..default()
        },
        ..default()
    });

    commands.spawn((
        MaterialMesh2dBundle {
            mesh: meshes.add(shape::Circle::new(25.).into()).into(),
            material: materials.add(ColorMaterial::from(Color::WHITE)),
            ..default()
        },
        Angle(180.0),
    ));
}

fn move_player_left(
    mut player: Query<(&mut Transform, &Sprite)>,
    input: Res<Input<KeyCode>>,
    time: Res<Time>,
) {
    for (mut transform, _player) in player.iter_mut() {
        if input.pressed(KeyCode::W) {
            transform.translation.y += 100.0 * time.delta_seconds();
        }
        if input.pressed(KeyCode::S) {
            transform.translation.y -= 100.0 * time.delta_seconds();
        }
        println!("PLAYER:{}", transform.translation);
    }
}

fn move_pong(mut pong: Query<(&mut Transform, &Angle, &Mesh2dHandle)>, time: Res<Time>) {
    let (mut transform, angle, _pong) = pong.get_single_mut().unwrap();
    let x = angle.0.to_radians().cos();
    let y = angle.0.to_radians().sin();

    transform.translation.x += 100.0 * x * time.delta_seconds();
    transform.translation.y += 100.0 * y * time.delta_seconds();
    println!("pong {:?}", transform.translation);
}

fn collision_pong(
    mut pong: Query<(&Transform, &mut Angle, &Mesh2dHandle)>,
    players: Query<(&Transform, &Sprite)>,
) {
    let (pong_pos, mut pong_angle, _pong_circle) = pong.get_single_mut().unwrap();
    for (player_pos, _) in players.iter() {
        let player_x_min = player_pos.translation.x - 50.;
        let player_x_max = player_pos.translation.x + 50.;
        let player_y_min = player_pos.translation.y - 100.;
        let player_y_max = player_pos.translation.y + 100.;

        let point = (
            player_x_min.max(pong_pos.translation.x.min(player_x_max)),
            player_y_min.max(pong_pos.translation.y.min(player_y_max)),
        );

        if collision_point_circle(point, (pong_pos.translation.x, pong_pos.translation.y, 25.)) {
            *pong_angle = Angle(0.0);
        }
    }
}

fn collision_point_circle(point: (f32, f32), circle: (f32, f32, f32)) -> bool {
    println!(
        "HIIIIII {}",
        ((point.0 - circle.0).abs().powi(2) + (point.1 - circle.1).abs().powi(2)).sqrt()
    );
    ((point.0 - circle.0).abs().powi(2) + (point.1 - circle.1).abs().powi(2)).sqrt() <= circle.2
}

fn confine_players(
    mut players: Query<(&mut Transform, &Sprite)>,
    window: Query<&Window, With<PrimaryWindow>>,
) {
    for (mut transform, _player) in players.iter_mut() {
        let window = window.get_single().unwrap();

        // let player_center = (100.0, 100.0);

        let y_min = -(window.height() / 2.0) + 100.0;
        let y_max = (window.height() / 2.0) - 100.0;

        if transform.translation.y < y_min {
            transform.translation.y = y_min;
        } else if transform.translation.y > y_max {
            transform.translation.y = y_max;
        }
    }
}
