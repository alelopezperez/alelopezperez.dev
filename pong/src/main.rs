use bevy::{prelude::*, window::PrimaryWindow};

fn main() {
    App::new()
        .add_plugins(DefaultPlugins)
        .add_systems(Startup, setup)
        .add_systems(Update, (move_player_left, confine_players))
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
