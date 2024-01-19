use bevy::prelude::*;

fn main() {
    App::new()
        .add_plugins(DefaultPlugins)
        .add_systems(Startup, setup)
        .add_systems(Update, move_player_left)
        .run();
}

fn setup(mut commands: Commands) {
    // We need a camera or else everythin will be a black screen
    commands.spawn(Camera2dBundle::default());
    commands.spawn(SpriteBundle {
        sprite: Sprite {
            custom_size: Some(Vec2::new(100.0, 200.0)),
            ..default()
        },
        ..default()
    });
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
