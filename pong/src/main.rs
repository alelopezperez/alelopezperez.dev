use bevy::{
    prelude::*,
    sprite::{Material2d, MaterialMesh2dBundle, Mesh2dHandle},
    transform,
    window::PrimaryWindow,
};

fn main() {
    App::new()
        .add_plugins(DefaultPlugins)
        .add_systems(Startup, setup)
        .add_systems(Update, (move_player_left, confine_players, move_pong))
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
            anchor: bevy::sprite::Anchor::Custom(Vec2::new(5.0, 0.0)),
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
    }
}

fn move_pong(mut pong: Query<(&mut Transform, &Angle, &Mesh2dHandle)>, time: Res<Time>) {
    let (mut transform, angle, pong) = pong.get_single_mut().unwrap();
    let x = angle.0.to_radians().cos();
    let y = angle.0.to_radians().sin();

    transform.translation.x += 100.0 * x * time.delta_seconds();
    transform.translation.y += 100.0 * y * time.delta_seconds();

    println!("HOLA:{} {} {:#}", x, y, transform.translation);
}

fn collision_pong(
    mut pong: Query<(&Transform, &mut Angle, &Mesh2dHandle)>,
    mut players: Query<(&Transform, &Sprite)>,
    time: Res<Time>,
) {
    let (pong_pos, mut pong_angle, _) = pong.get_single_mut().unwrap();
    for (player_pos, _) in players.iter() {}
}

fn confine_players(
    mut players: Query<(&mut Transform, &Sprite)>,
    window: Query<&Window, With<PrimaryWindow>>,
) {
    for (mut transform, player) in players.iter_mut() {
        let window = window.get_single().unwrap();

        let player_center = (100.0, 100.0);

        let y_min = -(window.height() / 2.0) + 100.0;
        let y_max = (window.height() / 2.0) - 100.0;

        if transform.translation.y < y_min {
            transform.translation.y = y_min;
        } else if transform.translation.y > y_max {
            transform.translation.y = y_max;
        }

        println!(
            "transform {:?} windoe:{}",
            transform.translation,
            window.height()
        );
    }
}
